import { Button, Title1 } from "@fluentui/react-components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useVaultState } from "../state.js";
import { formatCurrency } from "../utils.js";
import { Chart } from "./Chart.js";
import { Vault } from "./Vault/Vault.js";
import { Row } from "./common.js";

const VaultList = styled.div`
  padding: 16px;
`;

function Dashboard() {
  const location = useLocation();

  const vaults = useVaultState((state) => state.vaults);
  const setVaults = useVaultState((state) => state.setVaults);

  // const [vaults, setVaults] = useState<VaultData[]>(
  //   location.state.vaults || []
  // );

  useEffect(() => {
    setVaults(location.state.vaults);
  }, [location.state.vaults]);

  const totalAmount = formatCurrency(
    vaults.reduce((acc, { money }) => acc + (money?.[0]?.amount || 0), 0),
    "€"
  );

  return (
    <div id="App">
      <div>
        <Chart vaults={vaults} />
      </div>

      <Row
        style={{
          padding: "16px 16px 0 16px",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => {
            setVaults([
              ...vaults,
              {
                id: uuidv4(),
                name: "New Vault",
                money: [],
              },
            ]);
          }}
        >
          Add New Vault
        </Button>

        <Title1>{totalAmount}</Title1>
      </Row>

      <VaultList>
        {vaults.map((vault) => (
          <Vault key={vault.id} vault={vault} />
        ))}
      </VaultList>
    </div>
  );
}

export default Dashboard;
