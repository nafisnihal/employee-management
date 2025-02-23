"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

interface Employee {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  imageUrl: string;
}

export default function Card({ employee }: { employee: Employee }) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border  ">
        <CardItem translateZ="80" className="w-full">
          <Image
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem translateZ="80" className="text-xl font-bold mt-4">
          {employee?.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="70"
          className="text-sm max-w-sm mt-2 flex items-center gap-2"
        >
          <Phone size={16} /> {employee?.phone}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-sm max-w-sm mt-2 flex items-center gap-2"
        >
          <Mail size={16} /> {employee?.email}
        </CardItem>
        <CardItem
          as="p"
          translateZ="50"
          className="text-sm max-w-sm mt-2 flex items-center gap-2"
        >
          <MapPin size={16} />
          {employee?.address.length > 30
            ? `${employee.address.slice(0, 30)}...`
            : employee.address}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
