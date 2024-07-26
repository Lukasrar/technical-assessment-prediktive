import { Calendar } from "./components/Calendar";
import { CombinedProviders } from "./providers/CombinedProviders";

export const App = () => (
  <CombinedProviders>
    <Calendar />
  </CombinedProviders>
);
