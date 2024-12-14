<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AlphaDataService
{
    private $apiKey;
    private $baseUrl = 'https://alphadata.alfabank.ru/api/v1/';

    public function __construct()
    {
        $this->apiKey = config('services.alpha_data.api_key');
    }

    public function getCompetitorsAnalytics($inn)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey
        ])->get($this->baseUrl . 'competitors/analytics', [
            'inn' => $inn,
            'period' => 'quarter'
        ]);

        return $response->json();
    }

    public function getMarketShare($inn)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey
        ])->get($this->baseUrl . 'market/share', [
            'inn' => $inn
        ]);

        return $response->json();
    }
} 