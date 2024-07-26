import { ChakraProvider, theme } from "@chakra-ui/react";
import { CalendarProvider } from "./CalendarProvider";

interface CombinedProvidersProps {
  children: React.ReactNode;
}

export const CombinedProviders = (props: CombinedProvidersProps) => (
  <ChakraProvider theme={theme}>
    <CalendarProvider>{props.children}</CalendarProvider>
  </ChakraProvider>
);
