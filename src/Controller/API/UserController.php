<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api')]
class UserController extends AbstractController
{
   
    #[Route('/login', name: 'app_api_login', methods: ['POST'])]
   public function login(Request $request, UserRepository $userRepository, JWTEncoderInterface $jwtEncoder): JsonResponse
{
    $data = json_decode($request->getContent(), true);
    $email = $data['email'];
    $password = $data['password'];

    $user = $userRepository->findOneBy(['email' => $email]);

    if (!$user || !password_verify($password, $user->getPassword())) {
        return new JsonResponse(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
    }

    $token = $jwtEncoder->encode(['id' => $user->getId()]);

    return new JsonResponse(['token' => $token]);
}
    }

    


   
    
   

    