<?php

namespace App\DataFixtures;

use App\Entity\Country;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class CountryFixtures extends Fixture
{
    private $faker;

    public function __construct()
    {
        $this->faker = Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager): void
    {
        $countries = ['Qatar', 'France', 'Italy', 'Germany', 'Japan', 'Spain', 'China', 'India', 'United Kingdom', 'United States']; ;

        foreach ($countries as $countryName) {
            $country = new Country();
            $country->setName($countryName);
            $manager->persist($country);
            $this->addReference('country' . $countryName, $country);
        }

        $manager->flush();
    }
}