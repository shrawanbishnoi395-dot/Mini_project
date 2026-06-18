import streamlit as st
import pandas as pd

# Mock data matrix (mirroring your JS engine structure)
DATA = {
    "Virat Kohli": {
        "batting": {"ODI": {"avg": 58.67, "sr": 93.54}, "T20I": {"avg": 48.69, "sr": 137.04}},
        "fielding": {"ODI": {"matches": 295, "runouts": 18}, "T20I": {"matches": 125, "runouts": 7}}
    },
    "Babar Azam": {
        "batting": {"ODI": {"avg": 56.72, "sr": 88.75}, "T20I": {"avg": 41.03, "sr": 129.08}},
        "fielding": {"ODI": {"matches": 117, "runouts": 11}, "T20I": {"matches": 119, "runouts": 9}}
    }
}

st.title("🏏 Live Cricket Stats & Comparative Analytics")

# 1. Selection Core
col1, col2 = st.columns(2)
with col1:
    p1 = st.selectbox("Baseline Player (Player 1)", list(DATA.keys()), index=0)
with col2:
    p2 = st.selectbox("Challenger Player (Player 2)", list(DATA.keys()), index=1)

# 2. Extract Data Profiles
p1_data, p2_data = DATA[p1], DATA[p2]

# 3. Deep Insight Logic Engine
st.subheader("🧠 Algorithmic Deep Insights")
ins_col1, ins_col2 = st.columns(2)

with ins_col1:
    st.markdown("### Target Delta Deficiencies")
    for fmt in ["ODI", "T20I"]:
        p1_avg, p2_avg = p1_data["batting"][fmt]["avg"], p2_data["batting"][fmt]["avg"]
        p1_sr, p2_sr = p1_data["batting"][fmt]["sr"], p2_data["batting"][fmt]["sr"]
        
        if p2_avg < p1_avg:
            st.warning(f"**{fmt} Average Deficit:** {p2} lags by **{round(p1_avg - p2_avg, 2)}** runs.")
        if p2_sr < p1_sr:
            st.warning(f"**{fmt} Strike Rate Gap:** {p2} scoring velocity is **{round(p1_sr - p2_sr, 2)}** slower.")

with ins_col2:
    st.markdown("### Flaw Outlier Anomalies")
    for fmt in ["ODI", "T20I"]:
        # Defensive Reflex Anomaly Calculator
        p1_ro, p1_m = p1_data["fielding"][fmt]["runouts"], p1_data["fielding"][fmt]["matches"]
        p2_ro, p2_m = p2_data["fielding"][fmt]["runouts"], p2_data["fielding"][fmt]["matches"]
        
        p1_ratio, p2_ratio = p1_ro / p1_m, p2_ro / p2_m
        if p2_ratio > p1_ratio:
            st.success(f"**Defensive Reflex Anomaly ({fmt}):** {p2} executes run-outs at a higher frequency per match ({round(p2_ratio, 3)}) than {p1} ({round(p1_ratio, 3)}).")