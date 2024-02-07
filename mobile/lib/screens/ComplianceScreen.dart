import 'package:flutter/material.dart';

class ComplianceScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Compliance Management'),
      ),
      body: Center(
        child: Text(
          'Compliance Management Screen',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
