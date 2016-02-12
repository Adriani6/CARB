<?php
header('Content-type: application/json');

$client = "	826248c693a84ebc95d876382280b089";
$query = $_POST['q'];
$clnum = mt_rand(1,3);

$api = "https://api.instagram.com/v1/tags/".$query."/media/recent?client_id=".$client;


function get_curl($url) {
    if(function_exists('curl_init')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); 
        $output = curl_exec($ch);
        echo curl_error($ch);
        curl_close($ch);
        return $output;
    } else{
        return file_get_contents($url);
    }
}

$response = get_curl($api);
$images = array();

if($response){
	foreach(json_decode($response)->data as $item){		
        $src = $item->images->standard_resolution->url;
        $thumb = $item->images->thumbnail->url;
		$url = $item->link;
		
        $images[] = array(
        "src" => htmlspecialchars($src),
        "thumb" => htmlspecialchars($thumb),
        "url" => htmlspecialchars($url)
        );

    }
}

print_r(str_replace('\\/', '/', json_encode($images)));
die();
?>