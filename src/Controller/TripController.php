<?php

namespace App\Controller;

use App\Entity\Trip;
use App\Form\TripType;
use App\Repository\TripRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/trip')]
class TripController extends AbstractController
{
    #[Route('s', name: 'app_trip_index', methods: ['GET'])]
    public function index(TripRepository $tripRepository): Response
    {
            $trips = $tripRepository->findAll();
            $data = [];
            foreach ($trips as $trip) {
                $data[] = [
                    'id' => $trip->getId(),
                    'title' => $trip->getTitle(),
                    'description' => $trip->getDescription(),
                    'image' => $trip->getImage(),
                    'price' => $trip->getPrice(),
                ];
            }
    
            return new JsonResponse($data);
        }
    

    #[Route('s/category/{categoryName}', name: 'app_trips_by_category')]
    public function getTripsByCategory(string $categoryName, TripRepository $tripRepository): JsonResponse
    {
        $trips = $tripRepository->findByCategory($categoryName);
        return $this->json($trips, 200, context:['groups' => ["category_by_trip"]]);
    
    }


    #[Route('s/search', name: 'api_trips_search')]
public function searchTrips(Request $request, TripRepository $tripRepository): Response
{
    $category = $request->query->get('category');
    $country = $request->query->get('country');
    $duration = $request->query->getInt('duration');

    $trips = $tripRepository->searchTrips($category, $country, $duration);
    return $this->json($trips, 200, context:['groups' => ["category_by_trip"]]);

}

    #[Route('/new', name: 'app_trip_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $trip = new Trip();
        $form = $this->createForm(TripType::class, $trip);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
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
        return $this->render('trip/show.html.twig', [
            'trip' => $trip,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_trip_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Trip $trip, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(TripType::class, $trip);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_trip_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('trip/edit.html.twig', [
            'trip' => $trip,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_trip_delete', methods: ['POST'])]
    public function delete(Request $request, Trip $trip, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$trip->getId(), $request->getPayload()->get('_token'))) {
            $entityManager->remove($trip);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_trip_index', [], Response::HTTP_SEE_OTHER);
    }
    
}
