<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\GeoAnalytics;

class AnalyticsController extends Controller
{
    public function trackVisit(Request $request)
    {
        $ip = $request->ip();
        $geoData = $this->getGeoData($ip);
        
        GeoAnalytics::create([
            'user_id' => auth()->id(),
            'ip_address' => $ip,
            'country' => $geoData['country'],
            'city' => $geoData['city'],
            'latitude' => $geoData['latitude'],
            'longitude' => $geoData['longitude']
        ]);
        
        // Остальной код...
    }

    private function getGeoData($ip)
    {
        $response = Http::get("http://ip-api.com/json/{$ip}");
        
        return [
            'country' => $response['country'] ?? null,
            'city' => $response['city'] ?? null,
            'latitude' => $response['lat'] ?? null,
            'longitude' => $response['lon'] ?? null
        ];
    }

    public function showGeoAnalytics()
    {
        // Моковые данные для демонстрации
        $geoStats = [
            [
                'country' => 'Россия',
                'city' => 'Москва',
                'visits_count' => 12580,
                'revenue' => 2450000,
                'conversion_rate' => 3.2,
                'bounce_rate' => 32,
                'avg_time' => '4:35',
                'traffic_sources' => [
                    'organic' => 45,
                    'direct' => 30,
                    'referral' => 15,
                    'social' => 10
                ],
                'latitude' => 55.7558,
                'longitude' => 37.6173
            ],
            [
                'country' => 'Россия',
                'city' => 'Санкт-Петербург',
                'visits_count' => 8420,
                'revenue' => 1680000,
                'conversion_rate' => 2.8,
                'bounce_rate' => 35,
                'avg_time' => '4:12',
                'traffic_sources' => [
                    'organic' => 42,
                    'direct' => 28,
                    'referral' => 18,
                    'social' => 12
                ],
                'latitude' => 59.9343,
                'longitude' => 30.3351
            ],
            [
                'country' => 'Россия',
                'city' => 'Новосибирск',
                'visits_count' => 3240,
                'revenue' => 580000,
                'conversion_rate' => 2.5,
                'bounce_rate' => 38,
                'avg_time' => '3:45',
                'traffic_sources' => [
                    'organic' => 40,
                    'direct' => 25,
                    'referral' => 20,
                    'social' => 15
                ],
                'latitude' => 55.0084,
                'longitude' => 82.9357
            ]
            // ... остальные города
        ];

        // Группировка по федеральным округам
        $federalDistricts = [
            'Центральный' => ['revenue' => 3200000, 'visits' => 15800],
            'Северо-Западный' => ['revenue' => 1850000, 'visits' => 9600],
            'Сибирский' => ['revenue' => 980000, 'visits' => 5200],
            'Уральский' => ['revenue' => 850000, 'visits' => 4800],
            'Приволжский' => ['revenue' => 780000, 'visits' => 4200],
            'Южный' => ['revenue' => 620000, 'visits' => 3500],
            'Дальневосточный' => ['revenue' => 450000, 'visits' => 2800],
            'Северо-Кавказский' => ['revenue' => 270000, 'visits' => 1900]
        ];

        return view('admin.analytics.geo', [
            'geoStats' => $geoStats,
            'geoVisits' => $geoStats,
            'federalDistricts' => $federalDistricts
        ]);
    }

    public function showCompetitorAnalytics()
    {
        // Моковые данные по конкурентам
        $competitors = [
            'X5 Group' => [
                'market_share' => 11.5,
                'revenue' => [
                    'q1' => 6250000000,
                    'q2' => 6890000000,
                    'q3' => 7120000000,
                    'q4' => 7580000000
                ],
                'store_count' => 18900,
                'online_presence' => 85,
                'customer_satisfaction' => 4.2,
                'price_index' => 100, // базовый индекс для сравнения
                'traffic_share' => 15.8,
                'conversion_rate' => 3.8,
                'top_categories' => [
                    'Продукты питания' => 65,
                    'Бытовая химия' => 15,
                    'Товары для дома' => 12,
                    'Другое' => 8
                ]
            ],
            'Магнит' => [
                'market_share' => 9.8,
                'revenue' => [
                    'q1' => 5890000000,
                    'q2' => 6120000000,
                    'q3' => 6450000000,
                    'q4' => 6980000000
                ],
                'store_count' => 17200,
                'online_presence' => 78,
                'customer_satisfaction' => 4.0,
                'price_index' => 98,
                'traffic_share' => 14.2,
                'conversion_rate' => 3.5,
                'top_categories' => [
                    'Продукты питания' => 68,
                    'Бытовая химия' => 14,
                    'Товары для дома' => 10,
                    'Другое' => 8
                ]
            ],
            'Лента' => [
                'market_share' => 7.2,
                'revenue' => [
                    'q1' => 3250000000,
                    'q2' => 3480000000,
                    'q3' => 3680000000,
                    'q4' => 3920000000
                ],
                'store_count' => 8900,
                'online_presence' => 72,
                'customer_satisfaction' => 4.1,
                'price_index' => 95,
                'traffic_share' => 9.5,
                'conversion_rate' => 3.2,
                'top_categories' => [
                    'Продукты питания' => 62,
                    'Бытовая химия' => 16,
                    'Товары для дома' => 14,
                    'Другое' => 8
                ]
            ]
        ];

        return view('admin.analytics.competitors', compact('competitors'));
    }
} 