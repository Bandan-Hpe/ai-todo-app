import { Button } from "@/components/ui/button";
import { signInAction } from "../../actions/auth-actions";

export default function Home() {
  return (
    <div>
    
      <form action={signInAction}>
        <Button variant="default">Login</Button>
      </form>
    </div>
  );
}
