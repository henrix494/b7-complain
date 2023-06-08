"use client";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
export default function ProviderAuth({ children, session }) {
	return <SessionProvider session={session}>{children}</SessionProvider>;
}
