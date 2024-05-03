<?php

namespace App\Controller\API;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CategoryController extends AbstractController
{
    #[Route('api/categories', name: 'api_category', methods: ['GET'])]
    public function index(CategoryRepository $categoryRepository): JsonResponse
    {
            $categories = $categoryRepository->findAll();
            return $this->json($categories, context: ['groups' => 'category_by_trip']);
    }

  
}
