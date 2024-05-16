<?php

namespace App\DataFixtures;

use App\Entity\Contact;
use App\Entity\Trip;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ContactFixtures extends Fixture implements DependentFixtureInterface
{
    private $faker;

    public function __construct()
    {
        $this->faker = Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager): void
    {
        $trips = $manager->getRepository(Trip::class)->findAll();
        $users = $manager->getRepository(User::class)->findAll();

        for ($i = 0; $i < 20; $i++) {
            $contact = new Contact();
            $contact
                ->setTrip($this->faker->randomElement($trips))
                ->setUser($this->faker->randomElement($users))
                ->setName($this->faker->name())
                ->setEmail($this->faker->email())
                ->setPhone($this->faker->phoneNumber())
                ->setMessage($this->faker->sentence(10))
                ->setStatus($this->faker->randomElement(['new','in progress','resolved']));

            $manager->persist($contact);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [TripFixtures::class, UserFixtures::class];
    }
}