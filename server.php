<?php

if (isset($_GET['source'])) {
	highlight_file(__FILE__);
	exit;
}

require 'vendor/autoload.php';
use WebSocket\Client; // textalk/websocket
header('Content-type: text/plain; charset=utf-8');

echo "`?source` to view source\n\n";

$_time = microtime(1);

$client = new Client("wss://{$_SERVER['HTTP_HOST']}:8086");
print_r($client);
echo "\n";

$title = "Rudie's Symphony # " . rand(2, 7);
var_dump($title);
echo "\n";

$sent = $client->send(json_encode(array(
	'cmd' => 'insert',
	'title' => $title,
)));
var_dump($sent);
echo "\n";

echo "\n" . round((microtime(1) - $_time) * 1000) . " ms\n";
