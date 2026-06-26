class ApiResponse {
  static ok(res, message, data) {
    return res.status(200).json({
      message,
      data,
    });
  }

  static create(res, message, data) {
    return res.status(201).json({
      message,
      data,
    });
  }

  static noContent(res) {
    return res.status(204).send();
  }
}

export default ApiResponse;
