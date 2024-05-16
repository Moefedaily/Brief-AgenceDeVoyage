<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class UserFixtures extends Fixture implements DependentFixtureInterface
{
    private $faker;

    public function __construct()
    {
        $this->faker = Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager): void
    {
        for ($i = 10; $i < 20; $i++) {
            $user = new User();
            $user
                ->setEmail($this->faker->email())
                ->setRoles(['ROLE_USER'])
                ->setPassword($this->faker->password())
                ->setFirstName($this->faker->firstName())
                ->setLastName($this->faker->lastName())
                ->setPhone($this->faker->phoneNumber())
                ->setRole($this->getReference('role_' . $this->faker->randomElement(['Admin', 'Editor', 'User'])));

            $manager->persist($user);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [RoleFixtures::class];
    }
}
