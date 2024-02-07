import 'package:flutter/material.dart';

class RewardScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Reward View'),
      ),
      body: Center(
        child: Text(
          'Reward View Screen',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
