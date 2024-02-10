import 'package:flutter/services.dart';
import 'package:web3dart/web3dart.dart';
import 'package:mobile/utils/constant.dart'; // Assuming this file contains contractAddress1

Future<String> createSmartContract(
  int latitude,
  int longitude,
  int radius,
  int startTime,
  int endTime,
  int rewardAmount,
  String employeeAddress,
  String employerAddress,
  Web3Client ethClient,
  String privateKey,
) async {
  // Load contract ABI from assets
  String abi = await rootBundle.loadString('assets/abi.json');

  // Get contract address
  String contractAddress = contractAddress1;

  // Create credentials from private key
  EthPrivateKey credentials = EthPrivateKey.fromHex(privateKey);

  // Create DeployedContract instance
  final contract = DeployedContract(
    ContractAbi.fromJson(abi, 'Geologix'),
    EthereumAddress.fromHex(contractAddress),
  );

  // Create transaction
  final transaction = Transaction.callContract(
    contract: contract,
    function: contract.function('createSmartContract'),
    parameters: [
      BigInt.from(latitude),
      BigInt.from(longitude),
      BigInt.from(radius),
      BigInt.from(startTime),
      BigInt.from(endTime),
      BigInt.from(rewardAmount),
      EthereumAddress.fromHex(employeeAddress),
      EthereumAddress.fromHex(employerAddress),
    ],
  );

  // Send transaction
  final response = await ethClient.sendTransaction(
    credentials,
    transaction,
    chainId: null,
    fetchChainIdFromNetworkId: true,
  );

  // Return transaction hash
  return response;
}
