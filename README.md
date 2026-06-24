# Multi-State Monsoon Volatility Modeling & Climate Analytics Engine

An end-to-end predictive machine learning pipeline designed to clean unstructured daily precipitation matrices and engineer localized, state-specific Random Forest Regression ensembles to forecast rainfall trends and risk limits for the 2026 cycle.

## Project Architecture & Methodology

Standard macro-level forecasting models (like default ARIMA or generic Prophet loops) often smooth out massive environmental spikes, flattening severe drought or flood indicators into inaccurate averages. This system overcomes that limitation through a 4-tiered engineering approach:

1. **Granular Data Pipeline:** Ingests highly fragmented semicolon-separated daily matrices, handles recording anomalies, maps appropriate float constraints, and aggregates daily metrics (1st to 31st) into consolidated monthly volumetric features.
2. **Descriptive Analytics & Grid Visualization:** Automatically exports diagnostic multi-subplot charts—including Kernel Density Estimations (KDE) for probability skewness tracking and Box Plots for structural outlier detection.
3. **Spatial Feature Engineering:** Aggregates regional parameters by geographical state blocks to compute localized historical means and Coefficients of Variation (Volatility Index).
4. **Statistical Feature Blending:** Rather than discarding descriptive statistics, these calculated macro-spatial trends are dynamically injected directly back into the training data array as numeric weights alongside rolling multi-step month sequences (Lag features).
5. **Localized Model Isolation:** Automates a loop executing independent, hyperparameter-tuned Random Forest Regressors for every Indian state territory separately—extracting internal tree distribution variances to bound precise 5th percentile (Drought/Deficit) and 95th percentile (Flood/Surplus) risk thresholds.

## Dataset Mapping Configurations

The system is configured to target localized renamed inputs out-of-the-box:
* **Target File Identity:** `sanu.csv` (Semicolon `;` delimited format)
* **Tabular Schema:** `[state, district, month, 1st, 2nd, ... 31st]`

## Generated Deliverables & Outputs

* **`advanced_india_rainfall_report.png`:** A high-definition (300 DPI) 2x2 multi-plot visualization monitoring monsoonal momentum tracks, data density spreads, and regional dispersion thresholds.
* **Terminal Diagnostics:** Complete tabular print-outs classifying both the Top 5 High-Precipitation sectors and the Bottom 5 Hyper-Arid (Least Rainfall) alert zones, followed by an alphabetical state-by-state 2026 numeric prediction matrix.

## Core Prerequisites & Setup

Install the required production libraries directly via pip:
```bash
pip install pandas numpy matplotlib seaborn scikit-learn
