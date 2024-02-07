import 'package:flutter/material.dart';

class DeliveryScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Delivery Status'),
      ),
      body: Center(
        child: Text(
          'Delivery Status Screen',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
