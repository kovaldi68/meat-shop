<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('kovdi@bk.ru', 'Дмитрий Коваленко')

$mail->addAddress('blemory7@gmail.com');

$mail->Subject = 'Новый заказ в Колбасный Цех';

$body = '<h1>Новый заказ!</h1>'

if(trim(!empty($_POST['user-name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['user-name'].'</p>';
}
if(trim(!empty($_POST['user-tel']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['user-tel'].'</p>';
}
if(trim(!empty($_POST['user-email']))){
    $body.='<p><strong>E-mail:</strong> '.$_POST['user-email'].'</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>