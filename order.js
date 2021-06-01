<!DOCTYPE html>
<html lang="id">
<head>
	<title>Judul halaman</title>
	<link rel="stylesheet" href="css/order.css">
	<link rel="stylesheet" href="css/responsive.css">
	<!-- <link rel="stylesheet" href="fontawesome/css/all.css"> -->

	<script src="https://kit.fontawesome.com/b9a9bf6e53.js" crossorigin="anonymous"></script>
</head>
<body>
<div class="body-box">
	<nav class="navbar nav-bottom">
		<div class="left">
			<i class="fas fa-arrow-left" onclick="window.history.back()"></i> &nbsp 
			<a id="nav-logo" href="#"><img src="" alt=""> Jooha-Clothes</a>
		</div>
		<h3>ORDER</h3>
		<label class="to-home"><a href="index.html"><i class="fas fa-home"></i> HOME</a></label>
	</nav>

	<div class="container">
		<div class="form-order">
			<p class="order-head">Lorem ipsum dolor sit amet consectetur adipisicing elit. In animi eligendi, omnis, accusantium quas unde repellat ad vitae quidem necessitatibus distinctio, maiores assumenda ipsum voluptatem vero tempora aut? Ratione, commodi.</p>
			<div class="form-group">
				<label for="nama">Nama</label>
				<input type="text" id="nama" name="nama" placeholder="Nama lengkap" class="input-main">
				<!-- &nbsp<input type="text" id="nama-panggil" placeholder="Nama panggil"> -->
			</div>
			<p class="nama-text form-alert"></p>

			<div class="form-group">
				<label for="alamat">Alamat</label>
				<textarea id="alamat" name="alamat" class="input-main" placeholder="Masukan alamat lengkap anda sesuai tanda pengenal"></textarea>
			</div>
			<p class="alamat-text form-alert"></p>

			<div class="form-group">
				<label for="telpon">No Telpon</label>
				<input type="number" id="telpon" name="telpon" class="input-main" placeholder="Masukan nomor telepon anda">
			</div>
			<p class="telpon-text form-alert"></p>

			<div class="order-submit">
				<div class="agree">
					<input type="checkbox" name="rules" id="rules">
					<label for="rules" class="for-rules">Anda bersedia mengikuti <a href="kebijakan.html">Kebijakan dan Ketentuan</a> layanan kami.</label>
				</div>
				<button type="submit" id="order-button" onclick="orderCek()"><i class="fab fa-whatsapp"> ~ Order</i></button>
			</div>
			<p class="order-text"><span id="total-item"></span>, &nbsp<span id="total-harga"></span></p>
			<p class="order-ket">*Item yang diorder akan diantarkan ke alamat yang anda masukan. Pembayaran akan dilakukan ketika barang telah sampai ke anda (COD).</p>
		</div>
		<div class="cart">
			<table id="order-table">
				<tbody>
					<!-- catalog content -->
				</tbody>
			</table>
		</div>
	</div>

	<div class="black"></div>
	<div class="to-wa">
		<p class="to-wa-text">Anda akan dialihkan ke WhatsApp.<span class="time-count"></span><br>Untuk mengkonfirmasi orderan anda segera kirim teks pesan pada WhatsApp !</p>
		<hr>
		<button id="order-fix" onclick="whatsOrderList()"><img src="image/png/11.svg" > &nbsp WhatsApp &nbsp <span class="time-count"></span></button>
	</div>

</div> <!-- body box -->

<script src="js/order.js"></script>

</body>
</html>
