<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
  

    //test api
    #[Route('/users', methods: ['GET'], name: 'userAll')]
    public function getUsers(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $users = $userRepository->findAll();
    
        $context = [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            },
        ];
    
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
    
        $data = $serializer->serialize($users, 'json', $context);
    
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }




    //test api with id
    #[Route('/user/{id}', methods: ['GET'] ,name: 'userById')]
    public function getOneUser(User $user, SerializerInterface $serializer): JsonResponse
    {
        $data = $serializer->serialize($user, 'json');
        
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/user/login', name: 'app_user_login', methods: ['POST'])]
    public function login(Request $request, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $password = $data['password'];

        $user = $userRepository->findOneBy(['email' => $email]);

        if (!$user || !password_verify($password, $user->getPassword())) {
            return new JsonResponse(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        $token = bin2hex(random_bytes(16)); // generate random token!

        $responseData = [
            'token' => $token,
            'user' => $serializer->serialize($user, 'json', [
                'groups' => ['user'],
            ]),
        ];

        return new JsonResponse($responseData, Response::HTTP_OK);
    }

}