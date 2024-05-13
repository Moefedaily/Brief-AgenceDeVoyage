<?php

namespace App\Controller\API;

use App\Entity\Contact;
use App\Form\ContactType;
use App\Repository\ContactRepository;
use App\Repository\TripRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/contact')]
class ContactController extends AbstractController
{
  
    #[Route('/new', name: 'api_contacts_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $em, TripRepository $tripRepository, UserRepository $userRepository, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        if (!is_array($data)) {
            return $this->json('Invalid request data', Response::HTTP_BAD_REQUEST);
        }
    
        $contact = new Contact();
        $contact->setName($data['name'] ?? '');
        $contact->setEmail($data['email'] ?? '');
        $contact->setPhone($data['phone'] ?? '');
        $contact->setMessage($data['message'] ?? '');
        $contact->setStatus('new');
    
        if (isset($data['trip'])) {
            $trip = $tripRepository->find($data['trip']);
            if ($trip) {
                $contact->setTrip($trip);
            }
        }
    
        if (isset($data['user_'])) {
            $user = $userRepository->find($data['user_']);
            if ($user) {
                $contact->setUser($user);
            }
        }
    
        $errors = $validator->validate($contact);
    
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return $this->json($errorMessages, Response::HTTP_BAD_REQUEST);
        }
    
        $em->persist($contact);
        $em->flush();
    
        return $this->json('The contact has been successfully recorded', Response::HTTP_CREATED);
    }}
