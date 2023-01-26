import { Navbar, Button, Link, Text } from "@nextui-org/react";

export default function NavbarAuth() {
  const collapseItems = [
    "Features",
    "Customers",
    "Pricing",
    "Company",
    "Legal",
    "Team",
    "Help & Feedback",
    "Login",
    "Sign Up",
  ];

  return (
    <>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" />
          <Text b color="inherit" hideIn="xs">
            Youker-App
          </Text>
        </Navbar.Brand>
      </Navbar>
    </>
  )
}