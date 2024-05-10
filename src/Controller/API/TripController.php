<?php

namespace App\Controller\API;

use App\Entity\Trip;
use App\Form\TripType;
use App\Repository\TripRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/trip')]
class TripController extends AbstractController
{
    #[Route('s', name: 'app_trip_index', methods: ['GET'])]
    public function index(TripRepository $tripRepository): Response
    {
            $trips = $tripRepository->findAll();
            return $this->json($trips,200, context: ['groups'=>['category_by_trip','trip_by_id']]);

        }
    

    #[Route('s/category/{categoryName}', name: 'app_trips_by_category')]
    public function getTripsByCategory(string $categoryName, TripRepository $tripRepository): JsonResponse
    {
        $trips = $tripRepository->findByCategory($categoryName);
        return $this->json($trips,200, context: ['groups'=>['category_by_trip','trip_by_id']]);
    
    }


    #[Route('s/search', name: 'api_trips_search')]
public function searchTrips(Request $request, TripRepository $tripRepository): Response
{
    $category = $request->query->get('category');
    $country = $request->query->get('country');
    $duration = $request->query->getInt('duration');

    $trips = $tripRepository->searchTrips($category, $country, $duration);
    return $this->json($trips,200, context: ['groups'=>['category_by_trip','trip_by_id']]);

}

#[Route('s/{id}', name: 'get_trip_by_id', methods: ['GET'])]
public function getTripById($id, TripRepository $tripRepository)
{
    $trips = $tripRepository->find($id);
    if (!$trips) {
        return $this->json(['error' => 'Trip not found'], Response::HTTP_NOT_FOUND);
    }

    return $this->json($trips,200, context: ['groups'=>['category_by_trip','trip_by_id']]);
    
}

}
