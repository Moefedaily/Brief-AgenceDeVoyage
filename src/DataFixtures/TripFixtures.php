<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Country;
use App\Entity\Trip;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class TripFixtures extends Fixture implements DependentFixtureInterface
{
    private $faker;

    public function __construct()
    {
        $this->faker = Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager): void
    {
        $users = $manager->getRepository(User::class)->findAll();

        for ($i = 0; $i < 10; $i++) {
            $trip = new Trip();
            $trip
                ->setTitle($this->faker->sentence(3))
                ->setDescription($this->faker->sentence(10))
                ->setImage($this->faker->imageUrl())
                ->setStartDate($this->faker->dateTimeBetween('now', '+1 year'))
                ->setEndDate($this->faker->dateTimeBetween('+1 year', '+2 years'))
                ->setPrice($this->faker->randomFloat(2, 100, 1000))
                ->setEditor($this->faker->randomElement($users));

            $categories = ['Trending', 'Top Destinations'];
            foreach ($categories as $category) {
                if ($this->faker->boolean()) {
                    $trip->addCategory($this->getReference('category' . $category));
                }
            }

            $countries = ['Qatar', 'France', 'Italy', 'Germany', 'Japan', 'Spain', 'China', 'India', 'United Kingdom', 'United States']; 
            foreach ($countries as $country) {
                if ($this->faker->boolean()) {
                    $trip->addDestination($this->getReference('country' . $country));
                }
            }

            $manager->persist($trip);
            $this->addReference('trip_' . $i, $trip);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [UserFixtures::class, CategoryFixtures::class, CountryFixtures::class];
    }
}