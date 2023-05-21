import { Card, CardBody, Stack, StackDivider, Text, } from "@chakra-ui/react";

interface IBookingProps {
    user: string;
    checkIn: string;
    checkOut: string;
    guests: number;
}

export default function RoomReservation({ checkIn, checkOut, user, guests, }: IBookingProps) {
    return (
        <Card my="5" variant={"outline"} size="md">
            <CardBody>
                <Stack divider={<StackDivider />}>
                    <Text>Check In: {checkIn}</Text>
                    <Text>Check Out: {checkOut}</Text>
                    <Text>Guests: {guests}</Text>
                    <Text>Reservation under "{user}"</Text>
                </Stack>
            </CardBody>
        </Card>
    );
}