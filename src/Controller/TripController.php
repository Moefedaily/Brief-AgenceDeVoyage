<?php

namespace App\Controller;

use App\Entity\Trip;
use App\Form\TripType;
use App\Repository\TripRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/trip')]
class TripController extends AbstractController
{
    #[Route('/', name: 'app_trip_index', methods: ['GET'])]
    public function index(Request $request, TripRepository $tripRepository): Response
    {
        if ($this->isGranted('ROLE_ADMIN')) {
            $trips = $tripRepository->findAll();
        } else {
            $trips = $tripRepository->findAll();
            $userTrips = $tripRepository->findBy(['editor' => $this->getUser()]);
        }
    
        $showAll = $request->query->getBoolean('show_all', true);
    
        if ($this->isGranted('ROLE_EDITOR') && !$showAll) {
            $trips = $userTrips;
        }
    
        return $this->render('trip/index.html.twig', [
            'trips' => $trips,
            'showAll' => $showAll,
        ]);
    }


    #[Route('/new', name: 'app_trip_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        if (!$this->isGranted('ROLE_ADMIN') && !$this->isGranted('ROLE_EDITOR')) {
            throw $this->createAccessDeniedException("You don't have permission to access this page");
        }
        $trip = new Trip();
        $form = $this->createForm(TripType::class, $trip);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $this->getUser();
            $trip->setEditor($user);
            $entityManager->persist($trip);
            $entityManager->flush();

            return $this->redirectToRoute('app_trip_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('trip/new.html.twig', [
            'trip' => $trip,
            'form' => $form,
        ]);
    }

       
    #[Route('/{id}', name: 'app_trip_show', methods: ['GET'])]
    public function show(Trip $trip): Response
    {
        if (!$this->isGranted('ROLE_ADMIN') && !$this->isGranted('ROLE_EDITOR')) {
            throw $this->createAccessDeniedException("You don't have permission to access this page");
        }
        return $this->render('trip/show.html.twig', [
            'trip' => $trip,
        ]);
    }


    
    #[Route('/{id}/edit', name: 'app_trip_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Trip $trip, EntityManagerInterface $entityManager): Response
    {
        if ($this->isGranted('ROLE_ADMIN') || ($this->isGranted('ROLE_EDITOR') && $trip->getEditor() === $this->getUser())) {
        $form = $this->createForm(TripType::class, $trip);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_trip_index', [], Response::HTTP_SEE_OTHER);
        }
    } else {
        throw $this->createAccessDeniedException('Access denied.');
    }

        return $this->render('trip/edit.html.twig', [
            'trip' => $trip,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_trip_delete', methods: ['POST'])]
    public function delete(Request $request, Trip $trip, EntityManagerInterface $entityManager): Response
    {
     if ($this->isGranted('ROLE_ADMIN') || ($this->isGranted('ROLE_EDITOR') && $trip->getEditor() === $this->getUser()))
    {
        if ($this->isCsrfTokenValid('delete'.$trip->getId(), $request->getPayload()->get('_token'))) {
            $entityManager->remove($trip);
            $entityManager->flush();
        }
    }
else {
        throw $this->createAccessDeniedException('Access denied.');
    }
        return $this->redirectToRoute('app_trip_index', [], Response::HTTP_SEE_OTHER);
    }
}
