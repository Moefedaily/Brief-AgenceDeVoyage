<?php

namespace App\Entity;

use App\Repository\ContactRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ContactRepository::class)]
class Contact
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['contact_new'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\Length(max: 20, maxMessage: 'The Name field cannot exceed {{ limit }} characters')]
    #[Groups(['contact_new'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Assert\Email(message: 'The Email "{{ value }}" is not a valid email')]
    #[Groups(['contact_new'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Assert\Length(max: 20, maxMessage: 'The Phone field cannot exceed {{ limit }} characters')]
    #[Groups(['contact_new'])]
    private ?string $phone = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank(message: 'The message field is required')]
    #[Groups(['contact_new'])]
    private ?string $message = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'contacts', targetEntity: Trip::class, cascade: ['persist'])]
    #[ORM\JoinColumn(name: 'trip_id', referencedColumnName: 'id')]
    private ?Trip $trip = null;

    #[ORM\ManyToOne(inversedBy: 'contacts')]
    #[Groups(['contact_new'])]
    private ?User $user_ = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getTrip(): ?Trip
    {
        return $this->trip;
    }

    public function setTrip(?Trip $trip): static
    {
        $this->trip = $trip;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user_;
    }

    public function setUser(?User $user_): static
    {
        $this->user_ = $user_;

        return $this;
    }
}
