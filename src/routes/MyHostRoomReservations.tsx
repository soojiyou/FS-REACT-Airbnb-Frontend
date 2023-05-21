
import { Link, useParams } from "react-router-dom";
import { ISearchDate, getMyBookings } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";

export interface IMyBooking {
    pk: number;
    user: string;
    room: {
        name: string;
        price: number;
    };
    kind: string;
    check_in: string;
    check_out: string;
    guests: number;
}

export default function MyHostRoomReservations() {
    const { roomID } = useParams();
    // const [formDate, setFormDate] = useState<ISearchDate>({
    //     year: new Date().getFullYear(),
    //     month: new Date().getMonth() + 1,
    // });
    // const { isLoading, isError, error, data } = useQuery<IMyBooking[]>(["mybookings", roomID, formDate], getReservation);

    const { isLoading, data } = useQuery<IMyBooking[]>(["bookings"], getMyBookings);
    console.log(data);
    return (
        <Box
            mt={10}
            px={{
                base: 10,
                lg: 80,
            }}
        >
            <Text display={"block"} mb={8} as={"b"} fontSize={40}>
                My Bookings
            </Text>
            <Box mb={4}>
                <Text as={"b"}>Total Reservations: {data?.length}</Text>
            </Box>
            <Grid
                templateColumns={"5fr 2fr 2fr 2fr 2fr 2fr"}
                gap={3}
                w={"100%"}
                bgColor="gray.200"
                alignItems={"center"}
                justifyItems="center"
                borderTop={"1px solid gray"}
                borderBottom={"1px solid rgb(190,190,190)"}
                py={4}
                mb={2}
            >
                <GridItem as={"b"}>Room Name</GridItem>
                <GridItem as={"b"}>Price</GridItem>
                <GridItem as={"b"}>Guests</GridItem>
                <GridItem as={"b"}>Check In</GridItem>
                <GridItem as={"b"}>Check Out</GridItem>
                <GridItem as={"b"}>Available</GridItem>
            </Grid>
            {data?.map((booking) => (
                <Grid
                    key={booking.pk}
                    templateColumns={"5fr 2fr 2fr 2fr 2fr 2fr"}
                    gap={3}
                    w={"100%"}
                    bgColor="white.200"
                    alignItems={"center"}
                    justifyItems="center"
                    borderTop={"1px solid rgb(190,190,190)"}
                    borderBottom={"1px solid rgb(190,190,190)"}
                    py={3}
                    mb={1}
                >
                    <GridItem fontWeight={"400"} noOfLines={1}>
                        <Link to={"/"}>
                            <Text noOfLines={1} _hover={{ color: "red.500" }}>
                                {booking?.room?.name}
                            </Text>
                        </Link>
                    </GridItem>
                    <GridItem fontWeight={"400"}>${booking?.room?.price} / days</GridItem>
                    <GridItem fontWeight={"400"}>{booking?.guests} guests</GridItem>
                    <GridItem fontWeight={"400"}>{booking?.check_in}</GridItem>
                    <GridItem fontWeight={"400"}>{booking?.check_out}</GridItem>

                </Grid>
            ))
            }
        </Box >
    );


}