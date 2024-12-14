<?php

namespace App\Http\Controllers;

use App\Services\AlphaDataService;

class AlphaDataController extends Controller
{
    private $alphaDataService;

    public function __construct(AlphaDataService $alphaDataService)
    {
        $this->alphaDataService = $alphaDataService;
    }

    public function getCompetitorsAnalytics()
    {
        try {
            $companyInn = '7728168971'; // ИНН X5 Retail Group
            $competitorsData = $this->alphaDataService->getCompetitorsAnalytics($companyInn);
            $marketShare = $this->alphaDataService->getMarketShare($companyInn);

            return view('alpha-data.competitors', [
                'competitorsData' => $competitorsData,
                'marketShare' => $marketShare
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Ошибка при получении данных из Альфа Даты');
        }
    }
} 