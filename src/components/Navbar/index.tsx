import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { WalletButtons } from "../common/WalletButtons";
import { RequestAirdrop } from "../RequestAirdrop";
import { ShowSolBalance } from "../ShowSolBalance";
import { SendSol } from "../SendSol";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("event: ", event);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#00FFFF",
              height: "4px",
              borderRadius: "4px",
            },
            "& .MuiTab-root": {
              color: "#B0B0B0",
              fontWeight: "bold",
              padding: "12px 24px",
              borderRadius: "10px",
              margin: "0 4px",
              transition: "background-color 0.3s",
              "&.Mui-selected": {
                color: "#00FFFF",
                backgroundColor: "#121212",
              },
              "&:hover": {
                backgroundColor: "#333",
              },
            },
            backgroundColor: "#1a1a1a",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
          }}
        >
          <Tab label="Request Airdrop" {...a11yProps(0)} />
          <Tab label="Show Sol Balance" {...a11yProps(1)} />
          <Tab label="Send Sol" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            border: "1px solid #333",
            borderRadius: "15px",
            padding: "20px",
            backgroundColor: "#1a1a1a",
          }}
        >
          <WalletButtons />

          <Box
            sx={{
              flex: "1",
              padding: "50px",
              marginLeft: "20px",
              backgroundColor: "#121212",
              boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
            }}
          >
            <RequestAirdrop />
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            border: "1px solid #333",
            borderRadius: "15px",
            padding: "20px",
            backgroundColor: "#1a1a1a",
          }}
        >
          <WalletButtons />

          <Box
            sx={{
              flex: "1",
              padding: "50px",
              marginLeft: "20px",
              backgroundColor: "#121212",
              boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
            }}
          >
            <ShowSolBalance />
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            border: "1px solid #333",
            borderRadius: "15px",
            padding: "20px",
            backgroundColor: "#1a1a1a",
          }}
        >
          <WalletButtons />

          <Box
            sx={{
              flex: "1",
              padding: "50px",
              marginLeft: "20px",
              backgroundColor: "#121212",
              boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
            }}
          >
            <SendSol />
          </Box>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
