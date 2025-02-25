<?php

namespace App\Service;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class WebsocketService implements MessageComponentInterface
{

    protected $clients;
    protected $userConnections = [];

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        $this->setUserConnection($conn->resourceId, $conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function setUserConnection($userId, ConnectionInterface $conn) {
        $this->userConnections[$userId] = $conn;
        echo "Connection set for user $userId\n";
    }

    public function sendToUser($userId, $message) {
        if (isset($this->userConnections[$userId])) {
            $this->userConnections[$userId]->send($message);
            return true;
        } else {
            echo "There is no user with ID {$userId}\n";
            return false;
        }
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);

        if (isset($data['to']) && isset($data['message'])) {
            $this->sendToUser($data['to'], json_encode([
                'from' => $data['from'] ?? $from->resourceId,
                'message' => $data['message']
            ]));
        } else {
            echo "Need 'to' and 'message' keys\n";
        }
    }

    public function onClose(ConnectionInterface $conn) {
        //  La connexion est fermée, retirez-la, car nous ne pouvons plus lui envoyer de messages.
        $this->clients->detach($conn);
        unset($this->userConnections[$conn->resourceId]);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "Une erreur est survenue : {$e->getMessage()}\n";

        $conn->close();
    }
}