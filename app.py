import streamlit as st
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

st.set_page_config(page_title="Customer Analytics Engine", layout="wide")

st.title("📊 End-to-End Customer Analytics Pipeline")
st.subheader("Data-Driven Segmentation & Retention Dashboard")

@st.cache_data
def load_data_from_file(path):
    return pd.read_csv(path)

@st.cache_data
def load_data_from_buffer(buffer):
    return pd.read_csv(buffer)

# Try to load the artifact from repo root first
data = None
try:
    data = load_data_from_file("at_risk_customers.csv")
except FileNotFoundError:
    st.warning("Repository missing 'at_risk_customers.csv'. You can upload it below or paste data.")
    uploaded = st.file_uploader("Upload at_risk_customers.csv", type=["csv"])
    if uploaded is not None:
        try:
            data = load_data_from_buffer(uploaded)
        except Exception as e:
            st.error(f"Failed to read uploaded file: {e}")

# If still missing, provide an example dataframe so UI doesn't break
if data is None:
    st.info("No data loaded — showing example dummy dataset.")
    data = pd.DataFrame({
        "CustomerID": [1,2,3,4,5],
        "Recency": [10, 20, 5, 60, 30],
        "Frequency": [3, 1, 5, 2, 4],
        "MonetaryValue": [100, 50, 200, 20, 150]
    })

# KPIs
col1, col2, col3 = st.columns(3)
col1.metric("Total Customers Evaluated", len(data))
col2.metric("At-Risk Users Identified", len(data))
col3.metric("Action Status", "Playbook Ready")

st.markdown("---")

left_column, right_column = st.columns(2)

with left_column:
    st.write("### Operational Action List")
    st.write("This table contains live data ready for targeted marketing campaigns:")
    display_cols = [c for c in ["CustomerID", "Recency", "Frequency", "MonetaryValue"] if c in data.columns]
    st.dataframe(data[display_cols].head(10))

with right_column:
    st.write("### Download Marketing Playbook")
    st.write("Export the high-priority customer list directly into a CSV file:")
    csv = data.to_csv(index=False).encode("utf-8")
    st.download_button(
        label="📥 Download At-Risk Customers List",
        data=csv,
        file_name="at_risk_customers_target.csv",
        mime="text/csv"
    )
