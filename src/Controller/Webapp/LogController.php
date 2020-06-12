<?php

namespace App\Controller\Webapp;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class LogController
 * @package App\Controller\Webapp
 * @Route("/", name="cinegest_webapp_logs_")
 */
class LogController extends AbstractController
{
    /**
     * @Route("/login", name="login")
     */
    public function login()
    {
        return $this->render('webapp/log/login.html.twig');
    }
}
