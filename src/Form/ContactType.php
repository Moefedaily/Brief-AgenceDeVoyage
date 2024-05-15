<?php

namespace App\Form;

use App\Entity\Contact;
use App\Entity\Trip;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'attr' => [
                    'class' => 'mt-1 py-1 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                ],
            ])
            ->add('email', TextType::class, [
                'attr' => [
                    'class' => 'mt-1 py-1 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                ],
            ])
            ->add('phone', TextType::class, [
                'attr' => [
                    'class' => 'mt-1 py-1 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                ],
            ])
            ->add('message', TextType::class, [
                'attr' => [
                    'class' => 'mt-1 py-1 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                ],
            ])
            ->add('status', ChoiceType::class, [
                'choices' => [
                    'New' => 'new',
                    'In Progress' => 'in progress',
                    'Resolved' => 'resolved',
                ],
                'attr' => [
                    'class' => 'mt-1 py-1 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                ],
                'choice_value' => function ($choice) {
                    return $choice;
                }
            ])
            ->add('trip', EntityType::class, [
                'class' => Trip::class,
                'choice_label' => 'title',
                'attr' => [
                    'class' => 'mt-1 py-1 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                ],
            ])
            ->add('user_', EntityType::class, [
                'class' => User::class,
                'choice_label' => 'firstName' ,
                'attr' => [
                    'class' => 'mt-1 py-1 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Contact::class,
        ]);
    }
}