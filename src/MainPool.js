import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import Shapeshifters from './Shapeshifters.json';

const ShapeshifterAddress = "0xdBC5Fc4F321eEDF6644520aa0898C4d9e524315D";

const MainPool = ({ accounts, setAccounts }) => {
    const [tokenId, setTokenId] = useState(1);
    const [supply, setSupply] = useState(handleSupply().response);
    const isConnected = Boolean(accounts[0]);

    async function handleLiquidate() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                ShapeshifterAddress,
                Shapeshifters.abi,
                signer
            );
            try {
                const response = await contract.liquidate(BigNumber.from(tokenId));
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err);
            }
        }
    }

    async function handleResurrect() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                ShapeshifterAddress,
                Shapeshifters.abi,
                signer
            );
            try {
                const response = await contract.mintWithGoo(BigNumber.from(tokenId));
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err);
            }
        }
    }

    async function handleSupply() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                ShapeshifterAddress,
                Shapeshifters.abi,
                signer
            );
            try {
                const response = await contract.poolSupply();
                setSupply(response.toString());
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err);
            }
        }
    }

    const handleChange = (event) => setTokenId(event.target.value)

    return (
        <Flex justify="center" align="center" height="100vh" padding="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textAlign="center" textShadow="0 7px #301934">Pool</Text>
                </div>
                {isConnected ? (
                    <div>
                        <Text fontSize="12px" textAlign="center" textShadow="0 3px #301934" lineHeight="2">
                            One ShapeShifter NFT = 100 $GOO
                        </Text>
                    <Flex align="center" justify="center">
                        <Box 
                            backgroundColor="#301934"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            fontFamily="inherit"
                            padding="15px"
                            margin="0 5px"
                        >
                            TokenID:
                        </Box>
                        <Input
                            fontFamily="inherit"
                            width="100px"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="0px"
                            min="1"
                            max="10000"
                            type="number"
                            value={tokenId}
                            onChange={handleChange}
                        />
                    </Flex>
                    <div>
                        <Flex align="center" justify="center">
                            <Button 
                                backgroundColor="#301934"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color ="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleLiquidate}
                            >
                                Liqudate
                            </Button>
                            <Button 
                                backgroundColor="#301934"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color ="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleResurrect}
                            >
                                Resurrect
                            </Button>
                        </Flex>
                            <Text
                                fontSize="24px"
                                letterSpacing="-5.5%"
                                fontFamily="VT323"
                                textShadow="0 2px 2px #000000"
                            >
                                ShapeShifters In Pool: {supply}/10000
                            </Text>
                    </div>
                    </div>
                ) : (
                    <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 3px #000000"
                        color="D6517D"
                    >
                        Connect Wallet
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default MainPool;