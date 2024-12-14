Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    // Существующие маршруты...
    
    Route::get('/analytics/competitors', [AnalyticsController::class, 'showCompetitorAnalytics'])
        ->name('admin.analytics.competitors');
}); 