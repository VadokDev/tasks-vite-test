import { authService } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"


export const LoginView = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    authService.login(email, password).then(({ data }) => {
      localStorage.setItem('token', data.access_token);
      location.reload();
    });
  }

  const handleRegister = () => {
    authService.register(email, password).then(handleLogin);
  }

  return <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Sign in or register to manage your tasks</CardDescription>
    </CardHeader>
    <CardContent>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="button" onClick={handleLogin} className="w-full">
          Login
        </Button>

        <Button type="button" onClick={handleRegister} className="w-full">
          Register
        </Button>
      </form>
    </CardContent>
  </Card>
}