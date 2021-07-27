<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

$mail->setFrom('admin@ferma-holmovo.ru', 'Колбасный Цех');
$mail->addAddress('Ferma-kholmovo@yandex.ru');
$mail->Subject = 'Новый заказ на сайте Колбасный Цех';

$body = '<h1>Новый заказ c ' .$_POST['title']. '!</h1>';

if(trim(!empty($_POST['user-name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['user-name'].'</p>';
}
if(trim(!empty($_POST['user-tel']))){
    $body.='<p><strong>Номер телефона:</strong> '.$_POST['user-tel'].'</p>';
}
if(trim(!empty($_POST['user-email']))){
    $body.='<p><strong>Email:</strong> '.$_POST['user-email'].'</p>';
}



$body.='<p><strong>Заказ:</strong></p>'.$_POST['orderGoodsList'].'</p>';

$body.='<p><strong>Доставка в пределах КАД:</strong> '.$_POST['circle-accept'].'</p>';
$body.='<p><strong>Стоимость товаров:</strong> '.$_POST['goods-sum'].'</p>';
$body.='<p><strong>Итого:</strong> '.$_POST['total-sum'].'</p>';

$body.='<p><strong>Комментарий к заказу:</strong> '.$_POST['user-text'].'</p>';

$mail->Body = $body;

if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>