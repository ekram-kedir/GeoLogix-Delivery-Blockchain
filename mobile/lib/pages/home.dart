import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart';
import 'package:mobile/utils/constant.dart';
import 'package:web3dart/web3dart.dart';

class CreateContractScreen extends StatelessWidget {
  // Controller for text fields
  final TextEditingController latitudeController = TextEditingController();
  final TextEditingController longitudeController = TextEditingController();
  final TextEditingController radiusController = TextEditingController();
  final TextEditingController startTimeController = TextEditingController();
  final TextEditingController endTimeController = TextEditingController();
  final TextEditingController rewardAmountController = TextEditingController();

  // Function to create smart contract
  Future<void> createSmartContract(BuildContext context) async {
    // Initialize Web3 client
    final ethClient = Web3Client(infura_url, Client());

    // Get private key (you might want to handle private key securely in your app)
    String privateKey = owner_private_key;

    try {
      // Get input values from text fields
      int latitude = int.parse(latitudeController.text);
      int longitude = int.parse(longitudeController.text);
      int radius = int.parse(radiusController.text);
      int startTime = int.parse(startTimeController.text);
      int endTime = int.parse(endTimeController.text);
      int rewardAmount = int.parse(rewardAmountController.text);

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
          EthereumAddress, // Placeholder for employee address
          EthereumAddress, // Placeholder for employer address
        ],
      );

      // Send transaction
      final response = await ethClient.sendTransaction(
        credentials,
        transaction,
        chainId: null,
        fetchChainIdFromNetworkId: true,
      );

      // Print transaction hash
      print('Transaction Hash: $response');

      // Show success message or navigate to another screen
      // For example:
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Smart contract created successfully')),
      );
    } catch (e) {
      // Handle error (e.g., display error message)
      print('Error creating smart contract: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error creating smart contract')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Create Contract')),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextFormField(
              controller: latitudeController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(labelText: 'Latitude'),
            ),
            TextFormField(
              controller: longitudeController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(labelText: 'Longitude'),
            ),
            TextFormField(
              controller: radiusController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(labelText: 'Radius'),
            ),
            TextFormField(
              controller: startTimeController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(labelText: 'Start Time'),
            ),
            TextFormField(
              controller: endTimeController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(labelText: 'End Time'),
            ),
            TextFormField(
              controller: rewardAmountController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(labelText: 'Reward Amount'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => createSmartContract(context),
              child: Text('Create Contract'),
            ),
          ],
        ),
      ),
    );
  }
}
