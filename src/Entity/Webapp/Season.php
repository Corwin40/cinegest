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
 *          "groups"={"season_read"}
 *     }
 * )
 */
class Season
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"season_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=20)
     *
     * @Groups({"season_read", "videos_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"season_read"})
     */
    private $initAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"season_read"})
     */
    private $endAt;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @Groups({"season_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"season_read"})
     *
     */
    private $createAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @Groups({"season_read"})
     */
    private $updateAt;

    /**
     * @ORM\OneToMany(targetEntity=Video::class, mappedBy="season")
     * @Groups({"season_read"})
     */
    private $videos;

    public function __construct()
    {
        $this->videos = new ArrayCollection();
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
}
