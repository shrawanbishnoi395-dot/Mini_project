import streamlit as st
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

st.set_page_config(page_title="Customer Analytics Engine", layout="wide")

st.title("📊 End-to-End Customer Analytics Pipeline")
st.subheader("Data-Driven Segmentation & Retention Dashboard")

# 1. Load data safely
@st.cache_data
def load_data():
    # Reads the file you generated in Phase 5
    return pd.read_csv('at_risk_customers.csv')

try:
    rfm = load_data()
    
    # Key Performance Indicators (KPIs)
    col1, col2, col3 = st.columns(3)
    col1.metric("Total Customers Evaluated", len(rfm))
    col2.metric("At-Risk Users Identified", len(rfm))
    col3.metric("Action Status", "Playbook Ready")
    
    st.markdown("---")
    
    # Dashboard Layout
    left_column, right_column = st.columns(2)
    
    with left_column:
        st.write("### Operational Action List")
        st.write("This table contains live data ready for targeted marketing campaigns:")
        st.dataframe(rfm[['CustomerID', 'Recency', 'Frequency', 'MonetaryValue']].head(10))
        
    with right_column:
        st.write("### Download Marketing Playbook")
        st.write("Export the high-priority customer list directly into a CSV file:")
        
        # Streamlit Download Button
        csv = rfm.to_csv(index=False).encode('utf-8')
        st.download_button(
            label="📥 Download At-Risk Customers List",
            data=csv,
            file_name="at_risk_customers_target.csv",
            mime="text/csv"
        )
        
except FileNotFoundError:
    st.error("Missing Data Artifacts: Please ensure 'at_risk_customers.csv' is present in the repository root.")