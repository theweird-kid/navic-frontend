import { useState } from "react";
import { sendMessageToDevice } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SendMessage({ deviceId }: { deviceId: string }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSendMessage = async () => {
    setIsSending(true);
    setError(null);
    setSuccess(null);

    try {
      await sendMessageToDevice(deviceId, message);
      setSuccess("Message sent successfully!");
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          required
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && <p className="text-sm text-success">{success}</p>}
      <Button
        onClick={handleSendMessage}
        disabled={isSending}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isSending ? (
          <>
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </div>
  );
}
