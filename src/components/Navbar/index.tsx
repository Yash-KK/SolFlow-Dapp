import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
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
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            ".MuiTab-root": {
              color: "white",
            },
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
            border: "1px solid #ccc",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: "0.3",
              border: "1px solid #ccc",
              padding: "20px",
              justifyContent: "center",
              alignItems: "center",
              // height: "50vh",
              width: "100%",
            }}
          >
            <div>
              <div
              style={{ 
                marginBottom: "50px"
              }}
              >
                <WalletMultiButton />
              </div>
              <WalletDisconnectButton />
            </div>
          </Box>

          <Box
            sx={{
              flex: "1",
              border: "1px solid #ccc",
              padding: "20px",
              marginLeft: "20px",
            }}
          >
            Request Air Drop
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box
          sx={{
            display: "flex",
            border: "1px solid #ccc",
          }}
        >
          <Box
            sx={{
              flex: "0.3",
              border: "1px solid #ccc",
              padding: "20px",
            }}
          >
            Connect and Disconnect
          </Box>

          <Box
            sx={{
              flex: "1",
              border: "1px solid #ccc",
              marginLeft: "20px",
              padding: "20px",
            }}
          >
            Show Sol Balance
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box
          sx={{
            display: "flex",
            border: "1px solid #ccc",
          }}
        >
          <Box
            sx={{
              flex: "0.3",
              border: "1px solid #ccc",
              padding: "20px",
            }}
          >
            Connect and Disconnect
          </Box>

          <Box
            sx={{
              flex: "1",
              border: "1px solid #ccc",
              marginLeft: "20px",
              padding: "20px",
            }}
          >
            Send Sol
          </Box>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
