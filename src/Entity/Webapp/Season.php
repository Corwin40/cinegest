<?php

namespace App\Entity\Webapp;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\Webapp\SeasonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SeasonRepository::class)
 * @ApiResource(
 *     normalizationContext={
 *      "groups"={"seasons_read"}
 *     }
 * )
 */
class Season
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"seasons_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"seasons_read", "users_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"seasons_read"})
     */
    private $initAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"seasons_read"})
     */
    private $endAt;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"seasons_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"seasons_read"})
     */
    private $createAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"seasons_read"})
     */
    private $updateAt;

    /**
     * @ORM\OneToMany(targetEntity=Video::class, mappedBy="season")
     * @Groups({"seasons_read"})
     */
    private $videos;

    /**
     * @ORM\OneToMany(targetEntity=Adhesion::class, mappedBy="season")
     * @Groups({"seasons_read"})
     */
    private $adhesions;

    /**
     * @ORM\OneToMany(targetEntity=Card::class, mappedBy="season")
     * @Groups({"seasons_read"})
     */
    private $cards;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="season")
     * @Groups({"seasons_read"})
     */
    private $users;

    public function __construct()
    {
        $this->videos = new ArrayCollection();
        $this->adhesions = new ArrayCollection();
        $this->cards = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getInitAt(): ?\DateTimeInterface
    {
        return $this->initAt;
    }

    public function setInitAt(?\DateTimeInterface $initAt): self
    {
        $this->initAt = $initAt;

        return $this;
    }

    public function getEndAt(): ?\DateTimeInterface
    {
        return $this->endAt;
    }

    public function setEndAt(?\DateTimeInterface $endAt): self
    {
        $this->endAt = $endAt;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeInterface
    {
        return $this->createAt;
    }

    public function setCreateAt(?\DateTimeInterface $createAt): self
    {
        $this->createAt = $createAt;

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeInterface
    {
        return $this->updateAt;
    }

    public function setUpdateAt(?\DateTimeInterface $updateAt): self
    {
        $this->updateAt = $updateAt;

        return $this;
    }

    /**
     * @return Collection|Video[]
     */
    public function getVideos(): Collection
    {
        return $this->videos;
    }

    public function addVideo(Video $video): self
    {
        if (!$this->videos->contains($video)) {
            $this->videos[] = $video;
            $video->setSeason($this);
        }

        return $this;
    }

    public function removeVideo(Video $video): self
    {
        if ($this->videos->contains($video)) {
            $this->videos->removeElement($video);
            // set the owning side to null (unless already changed)
            if ($video->getSeason() === $this) {
                $video->setSeason(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Adhesion[]
     */
    public function getAdhesions(): Collection
    {
        return $this->adhesions;
    }

    public function addAdhesion(Adhesion $adhesion): self
    {
        if (!$this->adhesions->contains($adhesion)) {
            $this->adhesions[] = $adhesion;
            $adhesion->setSeason($this);
        }

        return $this;
    }

    public function removeAdhesion(Adhesion $adhesion): self
    {
        if ($this->adhesions->contains($adhesion)) {
            $this->adhesions->removeElement($adhesion);
            // set the owning side to null (unless already changed)
            if ($adhesion->getSeason() === $this) {
                $adhesion->setSeason(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Card[]
     */
    public function getCards(): Collection
    {
        return $this->cards;
    }

    public function addCard(Card $card): self
    {
        if (!$this->cards->contains($card)) {
            $this->cards[] = $card;
            $card->setSeason($this);
        }

        return $this;
    }

    public function removeCard(Card $card): self
    {
        if ($this->cards->contains($card)) {
            $this->cards->removeElement($card);
            // set the owning side to null (unless already changed)
            if ($card->getSeason() === $this) {
                $card->setSeason(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setSeason($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            // set the owning side to null (unless already changed)
            if ($user->getSeason() === $this) {
                $user->setSeason(null);
            }
        }

        return $this;
    }
}
