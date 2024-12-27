import Container from "@/components/Container";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container className="flex justify-center">
      <SignUp />
    </Container>
  );
}
