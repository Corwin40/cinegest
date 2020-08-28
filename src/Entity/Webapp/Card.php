<?php

namespace App\Entity\Webapp;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\Webapp\CardRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={
        "groups"={"cards_read"}
 *     }
 * )
 * @ORM\Entity(repositoryClass=CardRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Card
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"cards_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     *
     * @Groups({"cards_read"})
     */
    private $title;

     /**
     * @ORM\Column(type="string", length=100, nullable=true)
      *
      * @Groups({"cards_read"})
     */
    private $adress;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     *
     * @Groups({"cards_read"})
     */
    private $complement;

    /**
     * @ORM\Column(type="string", length=5, nullable=true)
     *
     * @Groups({"cards_read"})
     */
    private $zipcode;

    /**
     * @ORM\Column(type="string", length=40, nullable=true)
     *
     * @Groups({"cards_read"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=30)
     *
     * @Groups({"cards_read"})
     */
    private $status;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"cards_read"})
     */
    private $createAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"cards_read"})
     */
    private $updateAt;

    /**
     * @ORM\ManyToOne(targetEntity=Adhesion::class, inversedBy="cards")
     */
    private $adhesion;

    /**
     * @ORM\Column(type="string", length=14, nullable=true)
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=80, nullable=true)
     */
    private $email;

    /**
     * @ORM\OneToMany(targetEntity=Adherent::class, mappedBy="card")
     */
    private $adherents;

    public function __construct()
    {
        $this->adherents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(?string $adress): self
    {
        $this->adress = $adress;

        return $this;
    }

    public function getComplement(): ?string
    {
        return $this->complement;
    }

    public function setComplement(?string $complement): self
    {
        $this->complement = $complement;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(?string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeInterface
    {
        return $this->createAt;
    }

    /**
     * @ORM\PrePersist()
     */
    public function setCreateAt(): self
    {
        $this->createAt = new \DateTime();

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeInterface
    {
        return $this->updateAt;
    }

    /**
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function setUpdateAt(): self
    {
        $this->updateAt = new \DateTime();

        return $this;
    }

    public function getAdhesion(): ?Adhesion
    {
        return $this->adhesion;
    }

    public function setAdhesion(?Adhesion $adhesion): self
    {
        $this->adhesion = $adhesion;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return Collection|Adherent[]
     */
    public function getAdherents(): Collection
    {
        return $this->adherents;
    }

    public function addAdherent(Adherent $adherent): self
    {
        if (!$this->adherents->contains($adherent)) {
            $this->adherents[] = $adherent;
            $adherent->setCard($this);
        }

        return $this;
    }

    public function removeAdherent(Adherent $adherent): self
    {
        if ($this->adherents->contains($adherent)) {
            $this->adherents->removeElement($adherent);
            // set the owning side to null (unless already changed)
            if ($adherent->getCard() === $this) {
                $adherent->setCard(null);
            }
        }

        return $this;
    }
}
