function calculateMicroEquity(userContributionScore) {
    const totalPool = 10000; // کل استخر سهام هفتگی
    return (userContributionScore * totalPool) / 100;
}
