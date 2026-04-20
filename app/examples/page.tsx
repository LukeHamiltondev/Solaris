import type { Metadata } from "next";
import { ExampleBarberShowcase } from "../components/examples/ExampleBarberShowcase";

export const metadata: Metadata = {
  title: "Examples | Solaris Scaling",
  description:
    "Sample barber shop layout with booking assistant and swappable color themes."
};

export default function ExamplesPage() {
  return <ExampleBarberShowcase />;
}
