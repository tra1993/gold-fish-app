<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Key စစ်ဆေးခြင်း
$userKey = isset($_GET['key']) ? $_GET['key'] : '';
$validKeys = ["GF-1234", "VIP-9999", "GOLD-2025"];

if (!in_array($userKey, $validKeys)) {
    echo json_encode(["status" => "error", "message" => "Invalid Key"]);
    exit;
}

// ရတနာ Data များ
$products = [
    [
        "id" => 1,
        "name" => "Classic Ruby Earrings",
        "image" => "/assets/earring1.jpg",
        "audio" => "/assets/earring1.mp3",
        "description" => "ရိုးရှင်းပြီး ခမ်းနားသော ပတ္တမြား နားကပ်တစ်ရံ။ Gold Fish ၏ Signature Design ဖြစ်သည်။",
        "gold_weight" => "1 ကျပ်သား (ခန့်မှန်း)",
        "gem_type" => "Ruby (Mogok)"
    ],
    [
        "id" => 2,
        "name" => "Elegant Ruby Ring",
        "image" => "/assets/ring1.jpg",
        "audio" => "/assets/ring1.mp3",
        "description" => "ခေတ်ဆန်သော ဒီဇိုင်းနှင့် ပတ္တမြားတို့၏ ပေါင်းစပ်မှု။ စိန်နုများဖြင့် အလှဆင်ထားပါသည်။",
        "gold_weight" => "0.8 ကျပ်သား",
        "gem_type" => "Ruby & Diamonds"
    ]
];

// Data ပြန်ပို့ခြင်း
echo json_encode(["status" => "success", "data" => $products]);
?>

